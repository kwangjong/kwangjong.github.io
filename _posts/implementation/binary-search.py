def binarySearch(array, key):
  left = 0
  right = len(array)
  mid = 0

  while left <= right:
    mid = left + (right - left) / 2

    if array[mid] < key:
      left = mid + 1
    
    elif array[mid] > key:
      right = mid - 1

    else:
      return mid

  return -1