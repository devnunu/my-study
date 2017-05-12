package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class PrintChars {
    public static void main(String[] args){
        String str = "hello everyone!";
        printChars(str);
    }

    public static void printChars(String str){
        if(str.length()==0)
            return;
        else{
            System.out.print(str.charAt(0));
            printChars(str.substring(1));
        }
    }
}
