class Queue:
	def __init__(self):
		self.__queue = []

	def enqueue(self, elem):
		self.__queue.insert(0, elem)

	def dequeue(self):
		return self.__queue.pop()

	def size(self):
		return len(self.__queue)
# as you can see, you can use queue in python without implementing it using a list.