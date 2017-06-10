package backjoon.ex_10987;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 9..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split("");
        int count = 0;

        for(int i = 0; i<str.length; i++){
            if(str[i].equals("a")||str[i].equals("e")||str[i].equals("i")||str[i].equals("o")||str[i].equals("u")){
                count++;
            }
        }

        System.out.println(count);
    }
}
