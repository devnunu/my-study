package backjoon.ex_2914;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int songNum = sc.nextInt();
        int avg = sc.nextInt();

        System.out.println(songNum * (avg-1) + 1);

    }
}
