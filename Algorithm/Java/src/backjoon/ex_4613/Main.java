package backjoon.ex_4613;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str;

        while(true){
            str = sc.nextLine();
            if(str.equals("#")){
                break;
            }

            int num = 0;

            for(int i=0; i<str.length(); i++){
                if(str.charAt(i)!=' ') {
                    num += (str.charAt(i) - 64) * (i + 1);
                }
            }

            System.out.println(num);
        }
    }
}
