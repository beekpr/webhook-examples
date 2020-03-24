export interface Sender<M> {
    send(message: M): Promise<void>;
}

export interface Renderer<N, M> {
    render(notification: N): M;
}

export interface WebhookForwarder<N, M> {
    forward(notification: N): Promise<void>;
}

export abstract class AbstractWebhookForwarder<N, M> implements WebhookForwarder<N, M> {
    #renderer: Renderer<N, M>;
    #sender: Sender<M>;

    constructor(renderer: Renderer<N, M>, sender: Sender<M>) {
        this.#renderer = renderer;
        this.#sender = sender;
    }

    async forward(notification: N): Promise<void> {
        const message = this.#renderer.render(notification);
        await this.#sender.send(message);
    }
}