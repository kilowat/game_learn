import {
    Engine,
    Actor,
    Color,
    Shape,
    CircleCollider,
    PolygonCollider,
    Vector
} from 'excalibur';

export class DebugDraw extends Actor {
    private target: Actor;

    constructor(target: Actor) {
        super();
        this.target = target;
    }

    onPreDraw(ctx: CanvasRenderingContext2D) {
        // Сохраняем контекст
        ctx.save();

        // Устанавливаем стиль для коллайдеров
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        // Получаем все коллайдеры актора
        const collider = this.target.collider.get();


        if (collider instanceof CircleCollider) {
            // Рисуем круглый коллайдер
            ctx.beginPath();
            ctx.arc(
                collider.worldPos.x,
                collider.worldPos.y,
                collider.radius,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        } else if (collider instanceof PolygonCollider) {
            // Рисуем полигональный коллайдер
            ctx.beginPath();
            const points = collider.points;
            if (points.length > 0) {
                ctx.moveTo(
                    points[0].x + collider.worldPos.x,
                    points[0].y + collider.worldPos.y
                );
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(
                        points[i].x + collider.worldPos.x,
                        points[i].y + collider.worldPos.y
                    );
                }
                ctx.closePath();
            }
            ctx.stroke();
        }


        // Восстанавливаем контекст
        ctx.restore();
    }
}