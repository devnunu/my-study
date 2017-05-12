package sort;

/**
 * Created by homr on 2017. 4. 12..
 */
import java.util.Random;

public class Insertion {

    public static void insertionSort(int[] array) {
        for(int i = 1; i<array.length; i++){
            int temp = array[i];
            int comp = i-1;
            while(comp>=0 && array[comp]>temp){
                array[comp+1] = array[comp];
                comp--;
            }
            array[comp+1] = temp;
        }
    }

    // 여기서 부터는 테스트 코드 입니다
    // 순서대로 배열 생성
    public static int[] generateIntArray(int size) {
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = i + 1;
        }
        // 생성된 배열을 섞어준다
        shuffle(array);
        return array;
    }

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

    // 생성된 배열을 섞어줌
    public static void shuffle(int[] array) {
        Random r = new Random();
        for (int i = array.length - 1; i > 0; i--) {
            swap(array, i, r.nextInt(i));
        }
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

    // 배열의 두 값을 스왑해준다
    public static void swap(int[] array, int idx1, int idx2) {
        int temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }

    //main
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            int[] arr = generateIntArray(20);
            printArray(arr);

            insertionSort(arr);

            //result
            if (isSorted(arr)) {
                printArray(arr);
                System.out.println("Sorted Well");
            } else {
                System.out.println("Something Wrong");
            }
        }
    }
}
