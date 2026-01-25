let counter = 0;

export function generateId(): string {
    counter = (counter + 1) % 10000; // 0-9999 순환
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `${timestamp}_${counter}_${random}`;
}