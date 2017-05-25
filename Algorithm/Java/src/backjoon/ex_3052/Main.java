package backjoon.ex_3052;

import java.util.HashMap;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        HashMap<Integer, Integer> hash = new HashMap<Integer, Integer>();
        Scanner sc = new Scanner(System.in);

        for(int i=0; i<10; i++){
            int num = sc.nextInt();
            num %= 42;
            hash.put(num, 1);
        }
        int count = hash.size();

        System.out.print(count);
    }
}
