// lib/notify.ts
export function canNotify() {
    return typeof window !== "undefined" && "Notification" in window;
  }
  
  export async function ensureNotifyPermission(): Promise<boolean> {
    if (!canNotify()) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;
    const p = await Notification.requestPermission();
    return p === "granted";
  }
  
  export function showNotify(title: string, body?: string, tag?: string) {
    if (!canNotify() || Notification.permission !== "granted") return;
    try {
      new Notification(title, { body, tag /* 동일 tag면 중복 억제 */ });
    } catch {
      // noop
    }
  }
  