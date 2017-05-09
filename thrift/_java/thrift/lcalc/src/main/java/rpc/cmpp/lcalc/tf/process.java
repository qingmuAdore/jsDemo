package rpc.cmpp.lcalc.tf;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;

import rpc.cmpp.lcalc.tf.shared.SharedStruct;
import rpc.cmpp.lcalc.tf.tutorial.Calculator;
import rpc.cmpp.lcalc.tf.tutorial.InvalidOperation;
import rpc.cmpp.lcalc.tf.tutorial.Operation;
import rpc.cmpp.lcalc.tf.tutorial.Work;

/**
 * @author pzhang
 * @version v1.0.0
 * @time 2017/5/9 16:18
 */

public class process {
    public static void main(String[] args) {

        try {
            TTransport transport;
            transport = new TSocket("localhost", 9090);
            transport.open();
            TProtocol protocol = new TBinaryProtocol(transport);
            Calculator.Client client = new Calculator.Client(protocol);

            perform(client);

            transport.close();
        } catch (TException x) {
            x.printStackTrace();
        }
    }

    private static void perform(Calculator.Client client) throws TException {
        client.ping();
        System.out.println("ping()");

        int sum = client.add(1, 1);
        System.out.println("1+1=" + sum);

        Work work = new Work();

        work.op = Operation.DIVIDE;
        work.num1 = 1;
        work.num2 = 0;
        try {
            int quotient = client.calculate(1, work);
            System.out.println("Whoa we can divide by 0");
        } catch (InvalidOperation io) {
            System.out.println("Invalid operation: " + io.why);
        }

        work.op = Operation.SUBTRACT;
        work.num1 = 15;
        work.num2 = 10;
        try {
            int diff = client.calculate(1, work);
            System.out.println("15-10=" + diff);
        } catch (InvalidOperation io) {
            System.out.println("Invalid operation: " + io.why);
        }


        SharedStruct log = client.getStruct(1);
        System.out.println("Check log: " + log.value);
    }
}