package backjoon.ex_10797;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count=0;
        int comp = sc.nextInt();

        while(sc.hasNext()){
            int num = sc.nextInt();
            if(num==comp){
                count++;
            }
        }

        System.out.print(count);
    }
}
