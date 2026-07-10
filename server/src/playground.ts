import { Stack } from "./structures/Stack";
import { Queue } from "./structures/Queue";

console.log("=== Stack Tests ===");
testStack();

console.log("\n=== Queue Tests ===");
testQueue();

testQueueShift();

function testStack() {
  const s = new Stack<number>();

  s.push(1);
  s.push(2);
  s.push(3);

  console.log(s.toArray());
  console.log(s.pop());
  console.log(s.toArray());
  console.log(s.isEmpty());
  console.log(s.size());
  console.log(s.pop());
  console.log(s.pop());
  console.log(s.pop());

}

function testQueue() {
  const q = new Queue<number>();

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  q.enqueue(4);
  q.enqueue(5);

  console.log(q.toArray());

  q.dequeue()
  q.dequeue()
  q.dequeue()
  q.dequeue()

  console.log(q.size());
  console.log(q.toArray());

  q.enqueue(1);
  q.enqueue(2);
  console.log(q.toArray());

}

function testQueueShift() {
  const q = new Queue<number>();
  for (let i = 0; i < 100; i++) {
    q.enqueue(i);
    q.enqueue(i);
    q.dequeue();
  }
  console.log("Final size:", q.size());
  // @ts-expect-error — checking private field to sanity check shift
  console.log("Internal array length:", q.items.length);
}