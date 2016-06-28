export class <%= camelCased %>ValueConverter {
    toView(value) {
        return '@' + value;
    }

    fromView(value) {
        return value.replace('@', '');
    }
}
