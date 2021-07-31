export default interface RequestAdaptor<T> {
    toServiceObject(jsonObject: any): T;
}