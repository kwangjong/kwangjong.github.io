#Getting middle element of a LinkedList with unknown length:
#
# Two-Pass: Traverse the list once counting the length of the list. 
#           Then, traverse again until (length/2)th node.
#
# One-Pass: Traverse the list using two pointers. 
#           One pointer should traverse twice as fast as the other pointer. 
#           When the faster pointer reaches the tail, return the other pointer
#
### Two-Pass Solution
```python
def get_middle_two_pass(head):
  length = 0

  curr = head
  while curr != None:
    curr = curr.next
    length += 1

  curr = head
  length /= 2
  while length > 0:
    curr = curr.next
    length -= 1

  return curr.val
```
### One-Pass Solution
```python
def get_middle_one_pass(head):
  length = 0

  mid, curr = head, head
  while curr != None and curr.next != None:
    mid = mid.next
    curr = curr.next.next

  return mid.val

```