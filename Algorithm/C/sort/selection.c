#include<stdio.h>
#include<stdlib.h>

#define LEN 10
#define TRUE 1
#define FALSE 0

void generateArray(int *array){
    for(int i=0; i<LEN; i++){
        array[i] = i+1;
    }
}

void printArray(int *array){
    for(int i=0; i<LEN; i++){
        i==LEN-1 ? printf("%d\n", array[i]) : printf("%d ", array[i]);
        
    }
}

void swap(int *array, int idx1, int idx2){
    int temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}

void shuffle(int *array){
    for(int i=0; i<LEN; i++){
        int random = rand()%LEN;
        swap(array, i, random);
    }
}

void selectionSort(int* array){
    for(int i = LEN-1; i>-1; i--){
        int max=array[0];
        int maxIdx = 0;
        
        for(int j=0; j<i+1; j++){
            if(array[j]>max){
                max = array[j];
                maxIdx = j;
            }
        }
        
        swap(array, maxIdx ,i);
    }
}

int isSorted(int *array){
    int gap = array[1]-array[0];
    for(int i=2; i<LEN; i++){
        int gapComp = array[i]-array[i-1];
        
        if(gap!=gapComp){
            return FALSE;
        } 
    }
    return TRUE;
}

int main(){
    int arr[LEN];
    int *arrPtr = arr;

    generateArray(arrPtr);
    shuffle(arrPtr);

    selectionSort(arrPtr);
    if(isSorted(arrPtr)==TRUE){
        printf("this is sorted!\n");
        printArray(arrPtr);
    }else{
        printf("this is not sorted!\n");
        printArray(arrPtr);
    }
    
}