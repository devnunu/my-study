package backjoon.ex_2562;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arrOrigin = new int[9];
        int max=0, index=0;

        for(int i=0; i<9; i++){
            arrOrigin[i] = sc.nextInt();

            if(max<arrOrigin[i]){
                max=arrOrigin[i];
                index=i+1;
            }
        }
        System.out.println(max);
        System.out.println(index);
    }
}
