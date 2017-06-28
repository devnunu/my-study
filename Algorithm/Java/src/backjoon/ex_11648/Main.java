package backjoon.ex_11648;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split("");
        int count = 0;

        while(str.length!=1){
            int num = 1;
            for(int i =0; i<str.length; i++){
                num *= Integer.parseInt(str[i]);
            }
            str = Integer.toString(num).split("");
            count++;
        }

        System.out.print(count);
    }
}
