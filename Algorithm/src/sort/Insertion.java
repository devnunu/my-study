package sort;

/**
 * Created by homr on 2017. 4. 12..
 */
import java.util.Random;

public class Insertion {

    public static void sort(int[] array) {
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

    public static int[] generateIntArray(int size) {
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = i + 1;
        }
        shuffle(array);
        return array;
    }

    public static boolean isSorted(int[] array) {
        int comp = array[1]-array[0];
        for(int i = 1; i<array.length-1; i++){
            if((array[i+1]-array[i])!=comp){
                return false;
            }
        }
        return true;
    }

    public static void shuffle(int[] array) {
        Random r = new Random();
        for (int i = array.length - 1; i > 0; i--) {
            swap(array, i, r.nextInt(i));
        }
    }

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

    //swap two elements of indices
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

            sort(arr);

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
