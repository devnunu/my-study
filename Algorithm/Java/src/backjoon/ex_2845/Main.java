package backjoon.ex_2845;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 13..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int people = sc.nextInt()*sc.nextInt();

        for(int i =0; i<5; i++){
            System.out.print(sc.nextInt()-people + " ");
        }

    }
}
