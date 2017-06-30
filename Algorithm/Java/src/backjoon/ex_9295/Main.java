package backjoon.ex_9295;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 30..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        for(int i=1; i<=T; i++){
            int num = sc.nextInt() + sc.nextInt();

            System.out.println("Case "+i+": "+num);
        }
    }
}
