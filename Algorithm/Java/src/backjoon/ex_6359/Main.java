package backjoon.ex_6359;

import java.util.Arrays;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        while(T!=0){
            int size = sc.nextInt()+1;
            int count=0;
            boolean[] arr = new boolean[size];
            Arrays.fill(arr,false);

            for(int i = 1; i < size; i++){
                for(int j = 1; j*i < size; j++){
                    arr[j*i] = arr[j*i]==true ? false:true;
                }
            }

            for(int i = 0; i<size; i++){
                if(arr[i]==true){
                    count++;
                }
            }

            System.out.println(count);

            T--;
        }

    }
}
