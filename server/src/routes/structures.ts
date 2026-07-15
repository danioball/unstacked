import { Router } from "express";
import { stack, queue } from "../state";

const router = Router();

// Stack
router.get("/stack", (req, res) => {
  res.json(stack.toArray());
});

router.post("/stack/push", (req, res) => {
  const { value } = req.body;

  if (value === undefined || value === null) {
    return res.status(400).json({error: "Missing 'value' in request body"});
  }

  stack.push(value);
  res.status(201).json({ message: "Pushed successfully", stack: stack.toArray() });
});

router.post("/stack/pop", (req, res) => {
  if (stack.isEmpty()) {
    return res.status(409).json({ error: "Cannot pop from an empty stack" });
  }

  const value = stack.pop();
  res.status(200).json({ value, stack: stack.toArray() });
});

// Queue
router.get("/queue", (req, res) => {
  res.json(queue.toArray());
});

router.post("/queue/enqueue", (req, res) => {
  const { value } = req.body;

  if (value === undefined || value === null) {
    return res.status(400).json({error: "Missing 'value' in request body"});
  }

  queue.enqueue(value);
  res.status(201).json({ message: "Enqueued successfully", queue: queue.toArray() });
});

router.post("/queue/dequeue", (req, res) => {
  if (queue.isEmpty()) {
    return res.status(409).json({ error: "Cannot dequeue from an empty queue" });
  }

  const value = queue.dequeue();
  res.status(200).json({ value, queue: queue.toArray() });
});

export default router;