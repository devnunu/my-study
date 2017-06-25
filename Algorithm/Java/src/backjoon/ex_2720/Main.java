package backjoon.ex_2720;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int cost = sc.nextInt();

            int a = (int)cost/25;
            int b = (int)(cost-a*25)/10;
            int c = (int)(cost-a*25-b*10)/5;
            int d = cost-a*25-b*10-c*5;
            System.out.println(a+ " "+b+ " "+c+ " "+d);
            T--;
        }
    }
}
