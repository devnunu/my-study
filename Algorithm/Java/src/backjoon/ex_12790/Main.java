package backjoon.ex_12790;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 6..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int[] arr = new int[8];

            for(int i =0; i<8; i++){
                arr[i] = sc.nextInt();
            }

            int HP = arr[0]+arr[4];
            int MP = arr[1]+arr[5];
            int AP = arr[2]+arr[6];
            int DP = arr[3]+arr[7];

            HP = HP<1 ? 1 : HP;
            MP = MP<1 ? 1 : MP;
            AP = AP<0 ? 0 : AP;

            int result = HP+5*MP+2*AP+2*DP;
            System.out.println(result);
            T--;
        }
    }
}
