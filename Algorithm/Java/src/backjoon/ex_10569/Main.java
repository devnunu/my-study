package backjoon.ex_10569;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int V = sc.nextInt();
            int E = sc.nextInt();

            System.out.println(2-V+E);

            T--;
        }
    }
}
