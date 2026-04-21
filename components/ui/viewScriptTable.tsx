import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readMedications } from '../databaseUtils/database';

export function showMedicationTable() {
    const [medicationData, setMedicationData] = useState<any>([]);
    useFocusEffect(
        useCallback(() => {
            const medicationData: any[] = readMedications();
            setMedicationData(medicationData);
            console.log('loaded medication');
        }, [])


    );
    console.log(medicationData);
    return (
        <SafeAreaView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        Medicince:
                    </DataTable.Title>
                    <DataTable.Title>
                        Schedule:
                    </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {medicationData.map((item: any, index: number) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.schedule}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </ScrollView>
            </DataTable>
        </SafeAreaView>
    );

}