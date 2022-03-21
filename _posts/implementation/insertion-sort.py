def insertionSort(array):
	for i in range(1, len(array)):
		toInsert = array[i] # insert array[i] to sorted part
		
		j = i
		while j > 0 and array[j-1] > toInsert : # shift elements in the sorted part element less than toInsert is found
			array[j] = array[j-1]
			j -= 1

		array[j] = toInsert