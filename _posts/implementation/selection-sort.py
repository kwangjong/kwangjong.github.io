def selectionSort(array):
	for i in range(len(array)):
		smallestInd = i
		for j in range(i+1, len(array)): # find index of the smallest elements started from i+1
			if array[j] < array[smallestInd]:
				smallestInd = j

		array[i], array[smallestInd] = array[smallestInd], array[i] # swap i and smallestInd