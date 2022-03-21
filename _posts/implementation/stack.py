class Stack:
	def __init__(self):
		self.__stack = []

	def push(self, elem):
		self.__stack.append(elem)

	def pop(self):
		return self.__stack.pop()

	def size(self):
		return len(self.__stack)
# as you can see, you can use stack in python without implementing it using a list.