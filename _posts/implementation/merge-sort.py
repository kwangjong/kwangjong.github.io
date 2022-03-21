def merge(array, left, mid, right): # partitions array into low and high parts 
	leftPart = array[left:mid+1]
	rightPart = array[mid+1:right+1]
	
	i, j, k = 0, 0, left
	while i < len(leftPart) and j < len(rightPart): #add smallest element from left and right partition to the array
		if leftPart[i] < rightPart[j]: 
			array[k] = leftPart[i]
			i += 1
		
		else:
			array[k] = rightPart[j]
			j += 1

		k += 1

	while i < len(leftPart): #if leftPart is not empty add remaining to the array
		array[k] = leftPart[i]
		i += 1
		k += 1

	while j < len(rightPart): # if rightPart is not empty add remaining to the array
		array[k] = rightPart[j]
		j += 1
		k += 1

def mergeSort(array, left, right):
	if left >= right: # base-case
		return

	mid = left + (right - left) / 2

	mergeSort(array, left, mid) # recursive-case
	mergeSort(array, mid+1, right)

	merge(array, left, mid, right)