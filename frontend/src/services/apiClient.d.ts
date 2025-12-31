export declare function fetchCompleteDashboard<T>(): Promise<T>;
export declare function fetchSimpleForecast<T>(): Promise<T>;
export declare const apiClient: {
    fetchCompleteDashboard: typeof fetchCompleteDashboard;
    fetchSimpleForecast: typeof fetchSimpleForecast;
};
