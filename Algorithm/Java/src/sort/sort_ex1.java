package sort;

import java.util.Random;

/**
 * Created by homr on 2017. 5. 11..
 */

// 이미 정렬된 두 배열을 입력 받아서 새로운 정렬된 배열을 만드는 함수를 작성 하시오
public class sort_ex1 {
    public static void merge(int[] arr1, int[] arr2) {
        int length1 = arr1.length;
        int length2 = arr2.length;
        int num1 = 0, num2 = 0;
        int[] result = new int[length1 + length2];
        int remain = 0;

        while((num1+num2)<result.length){

            if(num1 >= length1){
                System.out.print("done");
                break;
            }else if(num2 >= length2){
                System.out.print("done");
                break;
            }

            if(arr1[num1]<arr2[num2]){
                result[num1+num2] = arr1[num1];
                arr1[num1] = 0;
                num1++;
            }else {
                result[num1 + num2] = arr2[num2];
                arr2[num2] = 0;
                num2++;
            }
        }

        if(num1>num2){
            while(num1 >= length1){
                result[num1 + num2] = arr1[num1];
                num1++;
            }
        }else{
            while(num2 >= length2){
                result[num1 + num2] = arr2[num2];
                num2++;
            }
        }


        printArray(result);
        System.out.println("");

    }

    // 테스트 코드
    // 해당 배열이 정렬되었는지 확인
    public static boolean isSorted(int[] array) {
        int comp = array[1]-array[0];
        for(int i = 1; i<array.length-1; i++){
            if((array[i+1]-array[i])!=comp){
                return false;
            }
        }
        return true;
    }

    // 배열을 출력하는 함수
    public static void printArray(int[] array) {
        System.out.print("[");
        for (int i = 0; i<array.length; i++) {
            if(i==array.length-1){
                System.out.printf(array[i] + "");
            }else{
                System.out.printf(array[i] + ", ");
            }
        }
        System.out.println("]");
    }

    //main
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            int[] arr1 = {1,2,5};
            int[] arr2 = {2,4,9,10};
            printArray(arr1);
            printArray(arr2);

            merge(arr1, arr2);


//            if (isSorted(resultArr)) {
//                printArray(resultArr);
//                System.out.println("Sorted Well");
//            } else {
//                printArray(resultArr);
//                System.out.println("Something Wrong");
//            }
        }
    }
}
