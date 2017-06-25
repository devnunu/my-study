package backjoon.ex_5717;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        while(true){
            int boy = sc.nextInt();
            int girl = sc.nextInt();

            if(boy==0&&girl==0)
                break;

            System.out.println(boy+girl);
        }
    }
}
