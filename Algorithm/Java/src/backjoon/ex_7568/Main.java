package backjoon.ex_7568;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 6..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        Person[] arr = new Person[num];

        for(int i =0; i<num; i++){
            arr[i] = new Person(sc.nextInt() , sc.nextInt());
        }

        for(Person p1 : arr){
            for(Person p2 : arr){
                if(p1.weight<p2.weight&&p1.tall<p2.tall){
                    p1.rank++;
                }
            }
        }

        String result = "";

        for(Person person : arr){
            result += person.rank +" ";
        }

        System.out.println(result);
    }

    private static class Person{
        public int weight;
        public int tall;
        public int rank;

        Person(int weight, int tall){
            this.weight = weight;
            this.tall = tall;
            this.rank = 1;
        }
    }
}

