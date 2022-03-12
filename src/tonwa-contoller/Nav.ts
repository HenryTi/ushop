export interface Nav {
    open(page: JSX.Element, afterClose?: () => void): void;
    close(level: number): void;
    openLogin(): void;
}
