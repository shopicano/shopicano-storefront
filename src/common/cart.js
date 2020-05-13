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

    static clear_cart(ctx) {
        return ctx.remove(this.key())
    }

    static is_empty(ctx) {
        return ctx.get(this.key()) === null || ctx.get(this.key()) === undefined
    }

    static set_billing_details(ctx, v) {
        ctx.set(this.key() + '_billing_details', v)
    }

    static get_billing_details(ctx) {
        return ctx.get(this.key() + '_billing_details')
    }

    static clear_billing_details(ctx) {
        return ctx.remove(this.key() + '_billing_details')
    }

    static set_shipping_details(ctx, v) {
        ctx.set(this.key() + '_shipping_details', v)
    }

    static get_shipping_details(ctx) {
        return ctx.get(this.key() + '_shipping_details')
    }

    static clear_shipping_details(ctx) {
        return ctx.remove(this.key() + '_shipping_details')
    }

    static set_shipping_method(ctx, v) {
        ctx.set(this.key() + '_shipping_method', v)
    }

    static get_shipping_method(ctx) {
        return ctx.get(this.key() + '_shipping_method')
    }

    static clear_shipping_method(ctx) {
        return ctx.remove(this.key() + '_shipping_method')
    }

    static set_billing_method(ctx, v) {
        ctx.set(this.key() + '_billing_method', v)
    }

    static get_billing_method(ctx) {
        return ctx.get(this.key() + '_billing_method')
    }

    static clear_billing_method(ctx) {
        return ctx.remove(this.key() + '_billing_method')
    }

    static get_cart_cost(ctx) {
        let items = ctx.get(this.key());
        if (items === null) {
            return 0
        }
        let charge = 0;
        for (let i in items) {
            charge += items[i].price * items[i].quantity
        }
        return charge;
    }

    static clear(ctx) {
        this.clear_cart(ctx);
        this.clear_billing_details(ctx);
        this.clear_billing_method(ctx);
        this.clear_shipping_details(ctx);
        this.clear_shipping_method(ctx);
    }
}

export default Cart;
