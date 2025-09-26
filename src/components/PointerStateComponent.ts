import * as ex from 'excalibur';

export interface PointerStateEvents {
    hover: (actor: ex.Actor) => void;
    click: (actor: ex.Actor) => void;
    leave: (actor: ex.Actor) => void;
}

export class PointerState extends ex.Component {
    public readonly type = 'ex.pointerstatecomponent' as const;

    private _state: 'idle' | 'hovered' = 'idle';
    private _suppressLeaveUntil = 0;
    private _events = new ex.EventEmitter<PointerStateEvents>();

    public get events(): ex.EventEmitter<PointerStateEvents> {
        return this._events;
    }

    public get state(): 'idle' | 'hovered' {
        return this._state;
    }

    onAdd(owner: ex.Entity): void {
        if (!(owner instanceof ex.Actor)) {
            throw new Error('PointerStateComponent can only be added to Actors');
        }

        const actor = owner as ex.Actor;

        actor.on('pointerenter', this._handlePointerEnter.bind(this));
        actor.on('pointerup', this._handlePointerUp.bind(this));
        actor.on('pointerleave', this._handlePointerLeave.bind(this));
    }

    onRemove(): void {
        this._events.clear();
    }

    private _handlePointerEnter(): void {
        if (this._state === 'idle') {
            this._state = 'hovered';
            this._events.emit('hover', this.owner as ex.Actor);
        }
    }

    private _handlePointerUp(): void {
        if (this._state === 'hovered') {
            this._events.emit('click', this.owner as ex.Actor);
            // Подавляем leave на пару кадров
            this._suppressLeaveUntil = performance.now() + 1;
        }
    }

    private _handlePointerLeave(): void {
        if (performance.now() < this._suppressLeaveUntil) {
            // это фантомный leave → игнорим
            return;
        }
        if (this._state !== 'idle') {
            this._state = 'idle';
            this._events.emit('leave', this.owner as ex.Actor);
        }
    }

    /**
     * Принудительно сбросить состояние в idle
     */
    public reset(): void {
        this._state = 'idle';
        this._suppressLeaveUntil = 0;
    }

    /**
     * Проверить, находится ли компонент в состоянии hover
     */
    public isHovered(): boolean {
        return this._state === 'hovered';
    }
}

// Для удобства использования
export class ClickableActor extends ex.Actor {
    public pointerState: PointerStateComponent;

    constructor(config?: ex.ActorArgs) {
        super(config);
        this.pointerState = new PointerStateComponent();
        this.addComponent(this.pointerState);
    }
}