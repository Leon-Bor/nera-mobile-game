import { useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

export function useObservable<T>(
  subject: Observable<T> | undefined
): T | undefined;
export function useObservable<T>(
  subject: Observable<T> | undefined,
  defaultValue: T
): T;
export function useObservable<T>(
  subject: Observable<T> | undefined,
  defaultValue?: T
): T | undefined {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  useEffect(() => {
    let sub: Subscription;
    if (subject) {
      sub = subject.subscribe((v) => {
        setValue(v);
      });
    }
    return () => {
      sub?.unsubscribe();
    };
  }, [subject]);

  return value;
}
