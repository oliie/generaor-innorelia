// Don't forget to add this value converter in main.ts (globalResources) if needed.
export class <%= camelCased %>ValueConverter {
    toView(value: any, param: any) {
        // Logic to view
        return value;
    }

    fromView(value: any, param: any) {
        // Logic from view
        return value;
    }
}
