# In addition to pop() and push(), implement a special stack that provides the maximum of the elements in it.
# 
# Solution: use additional stack that keep track of the maximum values. Only push values that is greater than the top element.
class Stack:
	def __init__(self):
		self.__stack = []
		self.__max = []

	def push(self, elem):
		self.__stack.append(elem)
		
		if len(self.__max) == 0 or self.__max[-1] < elem:
			self.__max.append(elem)

	def pop(self):
		elem = self.__stack.pop()

		if elem == self.__max[-1]:
			self.__max.pop()
		
		return elem

	def size(self):
		return len(self.__stack)

	def max(self):
		return self.__max[-1] if len(self.__max) > 0 else None