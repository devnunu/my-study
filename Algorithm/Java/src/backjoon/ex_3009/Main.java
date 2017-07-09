package backjoon.ex_3009;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 8..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] X = new int[3];
        int[] Y = new int[3];

        for(int i=0; i<3; i++){
            X[i] = sc.nextInt();
            Y[i] = sc.nextInt();
        }

        trialArrayComp(X);
        trialArrayComp(Y);

    }

    public static void trialArrayComp(int[] arr){
        if(arr[0]==arr[1]){
            System.out.print(arr[2]+" ");
        }else if(arr[0]==arr[2]){
            System.out.print(arr[1]+" ");
        }else{
            System.out.print(arr[0]+" ");
        }
    }
}
