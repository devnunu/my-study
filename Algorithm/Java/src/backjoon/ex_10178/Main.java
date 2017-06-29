package backjoon.ex_10178;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int candy = sc.nextInt();
            int brother = sc.nextInt();

            System.out.println("You get "+candy/brother+" piece(s) and your dad gets "+candy%brother+" piece(s).");
            T--;
        }
    }
}
