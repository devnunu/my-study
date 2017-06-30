package backjoon.ex_2789;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 30..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str = sc.next();

        System.out.println(str.replaceAll("[CAMBRIDGE]",""));
    }
}
