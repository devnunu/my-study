package backjoon.ex_5086;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        while(true){
            int[] arr = new int[2];
            arr[0] = sc.nextInt();
            arr[1] = sc.nextInt();

            if(arr[0]==0&&arr[1]==0){
                break;
            }

            if(arr[0]%arr[1]==0){
                System.out.println("multiple");
            }else if(arr[1]%arr[0]==0){
                System.out.println("factor");
            }else{
                System.out.println("neither");
            }
        }

    }
}
