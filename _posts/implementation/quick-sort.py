def partition(array, left, right): # partitions array into low and high parts 
	midpoint = left + (right - left) / 2 # set midpiont as the pivot
	pivot = array[midpoint]

	i, j = left, right
	while i < j:
		while array[i] < pivot: # find element greater than pivot on left-hand side
			i += 1

		while pivot < array[j]: # find element less than pivot on right-hand side
			j -= 1

		if i >= j: # if all elements are properly partitioned return j which is the last elementin the low partition
			return j

		array[i], array[j] = array[j], array[i]
		i += 1
		j -= 1

	return j

def quickSort(array, left, right):
	if left >= right: #base case: return if less than 1 element is in the given range
		return

	partitionIndex = partition(array, left, right) # partition the array

	quickSort(array, left, partitionIndex) #recursive case
	quickSort(array, partitionIndex+1, right)