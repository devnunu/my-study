package backjoon.ex_5522;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 2..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int result = 0;
        while(sc.hasNext()){
            result += sc.nextInt();
        }

        System.out.print(result);
    }
}
