class Node:
  def __init__(self, val, p_next=None):
    self.val = val
    self.next = p_next

class LinkedList:
  def __init__(self):
    self.__head = None
    self.__tail = None

  def append(self, val): #O(1)
    if self.__head == None:
      self.__head = Node(val)
      self.__tail = self.__head
   
    else:
      self.__tail.next = Node(val)
      self.__tail = self.__tail.next

  def get(self, index): #O(n)
    if self.__head == None:
      return None

    curr = self.__head
    while index > 0:
      if curr.next == None:
        return None
      curr = curr.next
      index -= 1

    return curr.val

  def delete(self, index): #O(n)
    if self.__head == None:
      return False

    curr = self.__head
    while index > 1:
      if curr.next == None:
        return False
      curr = curr.next
      index -= 1
    curr.next = curr.next.next
    
    return True