// Simple Pub/Sub event system (like Trust's MinPubSub)
const listeners = {};

export function publish(event, data) {
  if (!listeners[event]) return;
  listeners[event].forEach(fn => fn(data));
}

export function subscribe(event, fn) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(fn);
  return () => {
    listeners[event] = listeners[event].filter(f => f !== fn);
  };
}

export function unsubscribeAll(event) {
  delete listeners[event];
}
