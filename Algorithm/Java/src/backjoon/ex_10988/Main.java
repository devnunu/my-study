package backjoon.ex_10988;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 1..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split("");

        for(int i = 0; i<str.length/2; i++){
            int compIdx = str.length-i-1;

            if(!str[i].equals(str[compIdx])){
                System.out.print(0);
                return;
            }
        }

        System.out.print(1);
    }
}
