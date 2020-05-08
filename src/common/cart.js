class Cart {
    static key() {
        return "cart"
    }

    static add(ctx, value) {
        let prev = [];
        if (!this.is_empty(ctx)) {
            prev = this.get(ctx)
        }

        let old = value;
        if (this.is_added(ctx, value.id)) {
            this.remove_item(ctx, old.id);
            prev = this.get(ctx)
        }

        prev.push(old);
        ctx.set(this.key(), prev)
    }

    static is_added(ctx, id) {
        return this.get_item(ctx, id) !== null
    }

    static get_item(ctx, id) {
        let prev = ctx.get(this.key());
        if (prev === null) {
            return null
        }

        for (let i = 0; i < prev.length; i++) {
            if (prev[i].id === id) {
                return prev[i]
            }
        }
        return null
    }

    static remove_item(ctx, id) {
        let prev = ctx.get(this.key());
        let new_list = [];
        for (let i = 0; i < prev.length; i++) {
            if (prev[i].id !== id) {
                new_list.push(prev[i]);
            }
        }
        ctx.set(this.key(), new_list);
    }

    static get(ctx) {
        return ctx.get(this.key())
    }

    static is_empty(ctx) {
        return ctx.get(this.key()) === null || ctx.get(this.key()) === undefined
    }
}

export default Cart;
